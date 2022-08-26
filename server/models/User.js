/* eslint-disable camelcase */
const Orm = require('./Orm');
const pool = require('./db');
// const mailer = require('../util/Mailer');

class User extends Orm {
  constructor() {
    super('users', 'id');
  }

  createUser(userDict) {
    const columns = Object.keys(userDict).join(', ');
    const values = Object.values(userDict).join("', '");
    // console.log(`INSERT INTO ${this.table} (${columns}) VALUES ('${values}')`);
    // columns = makeColumns(userDict)
    return this.insert(columns, values);
  }

  async getAllUsers() {
    const response = await this.getAll();
    return response.rows;
  }

/*   getAllMale() {
    const sql = `SELECT * FROM ${this.table} WHERE preference='male' AND gender='male'`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  getAllFemale() {
    const sql = `SELECT * FROM ${this.table} WHERE preference='female' AND gender='female'`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  } */

  getAllFilter() {
    const sql = `SELECT * FROM ${this.table} INNER JOIN photos p on users.id = p.user_id`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async getUsername(id) {
    const response = await this.get('username', 'id', id);
    return response.rows[0].username;
  }


  async getUser(id) {
    const response = await this.getAllFields('users', 'id', id);
    return response.rows[0];
  }

  async getUserByName(username) {
    const response = await this.getAllFields('users', 'username', username);
    return response.rows[0];
  }

  async getTags(userId) {
    const sql = `SELECT tag.name
  FROM tag
      JOIN usersTag
      ON tag.id=usersTag.tag_id
      JOIN users
      ON usersTag.user_id=users.id
  WHERE
      users.id = ${userId}`;

    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async setActive(user_id, activation_code) {
    const response = await super.get('activation_code', 'id', user_id);
    if (response.rows[0].activation_code == activation_code) {
      super.update('active', 'true', 'id', user_id)
    }
  }



  async insertTag(userId, tagId) {
    const sql = `INSERT INTO userstag (user_id, tag_id) VALUES (${userId}, ${tagId})`;
    console.log(this.sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  makePreference(preference, gender) {
    const sql= "(gender='"+gender+"' AND (preference='both' OR preference='"+preference+"'))";
    return sql;
  }

  zeroPad(d) {
    return ("0" + d).slice(-2)
  }

  getAgeFilter(birthdate) {
    const date =new Date(birthdate).getDate();
    const year = new Date(birthdate).getFullYear();
    let month =  new Date(birthdate).getMonth();
    month = month+1
    const pgbirthdate = year+'-'+this.zeroPad(month)+'-'+this.zeroPad(date)
    const sql = "(birthdate >='"+pgbirthdate+"')"; // between 1 AND 2
    return sql;
  }
  // makeTags(tags) {

  // }
  makeSelectDistance(latitude, longitude) {
  const sql = `(earth_distance(
              ll_to_earth(cast(latitude AS float), cast(longitude AS float)),
      ll_to_earth(cast(`+latitude+` AS float), cast(`+longitude+` AS float)))
    ) AS distance`
    return sql
  }

  makeWhereDistance(latitude, longitude,maxdistance){

    return `
    ((earth_distance(
      ll_to_earth(cast(latitude AS float), cast(longitude AS float)),
      ll_to_earth(cast(`+latitude+` AS float), cast(`+longitude+` AS float)))
    ) BETWEEN 0 AND `+maxdistance+`)`;

  }

  // likesFilter(user) {
  //   return `
  //   exists(select * from likes where likes.liker_id=`+user+`)
  //   `
  // }

  getLikesFilter(user) {
    return "likes.liker_id IS NULL OR NOT likes.liker_id="+user+" AND NOT users.id='"+user+"'"
  }
  getBlockedFilter(user) {
    return "blocked.blocked_id IS NULL OR NOT blocked.blocked_id="+user+" AND NOT users.id='"+user+"'"
  }

  getTagsFilter(user){
    return `inner join (select user_id, count(*) as common_tags from   userstag ut where  ut.tag_id in ( SELECT tag_id from userstag where user_id = `+user+`) AND NOT user_id = `+user+` group by ut.user_id) A ON users.id=A.user_id`
  }

/* 
 * Get next match with minimum distance, not in likes or blocks, 
 * younger and same sexual preference
 * 
 * remarks
 * (tags filter maybe not good on this)
 */

  async getNextMatch(userId) {
    const user = await this.getUser(userId);
    const tags = await this.getTags(userId);
    // const tagsSql = this.makeTags(tags);
    const preferenceSql = this.makePreference(user.preference, user.gender);
    const ageFilter = this.getAgeFilter(user.birthdate);
    const maxdistance = 1000000 // 1000 km
    const whereDistanceSql = this.makeWhereDistance(user.latitude, user.longitude, maxdistance);
    const selectDistanceSql = this.makeSelectDistance(user.latitude,user.longitude);
    const likesFilter = this.getLikesFilter(userId);
    const blockedFilter = this.getBlockedFilter(userId)
    const orderBy = "ORDER BY users.fame DESC"
    const joinLikes = "FULL OUTER JOIN likes ON users.id = likes.user_id "
    const joinBlocked = "FULL OUTER JOIN blocked ON users.id = blocked.user_id "
    const tagsFilter = this.getTagsFilter(userId)
    const sql = "select *, users.id as id, "+selectDistanceSql+" from users "+joinLikes+" "+joinBlocked+" /* "+tagsFilter+" */ WHERE ("+likesFilter+") AND ("+blockedFilter+") AND "+preferenceSql+" AND "+ageFilter+" AND "+whereDistanceSql+" "+orderBy+" LIMIT 1";

    console.log(sql);
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  updateIpLocation(user, longitude, latitude) {
    super.update("ip_longitude", longitude, "id", user)
    super.update("ip_latitude",  latitude, "id", user)
  }
  async addFame(userId, amount) {
    const response = await super.get("fame", "id", userId)
    const fame = response.rows[0].fame + amount
    super.update("fame", fame, "id", userId)
  }
  
  updateLoggedIn(user) {
    super.updateWithScript("logged_in", 'CURRENT_TIMESTAMP', "id", user);
  }
}

module.exports = new User();

/* if didnt log in for 7 days, fame is zeroed, otherwise every like give 10 and profile view 5
*https://www.pgadmin.org/docs/pgadmin4/development/pgagent.html
*/

// async addFame(userId, amount) {

// }
// // check all users if they logged in or not
// async fameCheck() {


// }



// get closestmatches, order by most common tags and fame
// async getTopMatches(userId) {
//   const sql = `SELECT id FROM users ORDER BY `
// }

// filter age, filter sexual preference then  get top 100 closest that don't have conversation,
// async getClosestMatches(userId) {
//   const sql = `SELECT latitude, longitude FROM users`;
//   result = await pool.query(sql);
//   {latitude, longitude} = this.getAllFields(userId);

// }

// static sendActivationMail(mail) {
//   crypto.randomBytes(48, (_err, buffer) => {
//     const token = buffer.toString('hex');
//     mailer(
//       mail,
//       'Matcha: Please activate your account',
//       `Please activate your account in the following address: http:\\\\localost\\activate_account?=${token}`
//     );
//     console.log(token);
//   });
// }

// match(userId, likerId)
// updateFame() {
//   //count visit frequency
//   //counts like frequency

// }
// updatePassword(id, password) {
//   this.update(`password=${password}`);
// }

// getMail
// generateActivationCode
// updatePassword
// deletePasswordCode