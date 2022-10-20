const { link } = require('fs');
const pool = require('./db');
const User = require('./User');
const UsersTag = require('./UsersTag');
class Filter {
  static getAgeFilter(mindate, maxdate) {
    const sql = `(birthdate BETWEEN '` + mindate + `' AND '` + maxdate + `')`; // between 1 AND 2
    return sql;
  }

  static makeSelectDistance(latitude, longitude) {
    const sql =
      `(earth_distance(
                    ll_to_earth(cast(latitude AS float), cast(longitude AS float)),
            ll_to_earth(cast(` +
      latitude +
      ` AS float), cast(` +
      longitude +
      ` AS float)))
          ) AS distance`;
    return sql;
  }

  static makeWhereDistance(latitude, longitude, maxdistance) {
    return (
      `
          ((earth_distance(
            ll_to_earth(cast(latitude AS float), cast(longitude AS float)),
            ll_to_earth(cast(` +
      latitude +
      ` AS float), cast(` +
      longitude +
      ` AS float)))
          ) BETWEEN 0 AND ` +
      maxdistance +
      `)`
    );
  }

  static makePreference(preference, gender) {
    let sql = '';
    if (preference === 'male' || preference === 'female') {
      sql = "(gender='" + preference + "' AND (preference='both' OR preference='" + gender + "'))";
    } else {
      sql = "(preference='both' OR preference='" + gender + "')";
    }
    return sql;
  }

  static zeroPad(d) {
    return ('0' + d).slice(-2);
  }

  static getLikesFilter(user) {
    return (
      `
      users.id NOT IN (
        select 
          user_id 
        from 
          likes full 
          outer JOIN users ON likes.liker_id = users.id 
        WHERE 
          liker_id = ` +
      user +
      `
        group by 
          likes.user_id, 
          likes.liker_id
      )`
    );
  }
  static getBlockedFilter(user) {
    //    return `blocked.blocked_id IS NULL OR NOT blocked.user_id='` + user + `'`;

    return (
      `users.id NOT IN (select blocked_id from blocked full outer JOIN users ON blocked.blocked_id = users.id  WHERE user_id=` +
      user +
      ` group by blocked.user_id, blocked.blocked_id)`
    );
  }

  static getTagsFilter(tags) {
    let sql = `tag.name in ( `;

    tags.forEach((tag) => (sql += `'` + tag + `',`));
    sql = sql.slice(0, -1);
    sql += `)) AND (`;
    return sql;
  }

  static getOrderBy(orderby, tags) {
    if (orderby == 'fame') return 'ORDER BY users.fame DESC';
    if (orderby == 'age') return 'ORDER BY users.birthdate DESC';
    if (orderby == 'distance') return 'ORDER BY distance ASC';
    if (tags === 0) {
      return 'ORDER BY users.birthdate DESC';
    } else if (orderby == 'common tags') {
      return 'ORDER BY common_tags DESC';
    }
  }

  static async getFilterMatch(request) {
    // console.log(request);
    const userId = request.id;
    const limit = request.limit;

    let resp = [];

    resp = await User.getUserNoTags(userId);
    const user = resp.rows[0];
    if (typeof user == 'undefined') {
      const rows = [];
      const results = [rows];
      return { rows };
    }
    if (!user.gender) {
      const rows = [];
      const results = [rows];
      return { rows };
    }

    const preferenceSql = this.makePreference(request.preference, user.gender);
    const ageFilter = this.getAgeFilter(request.mindate, request.maxdate);
    const whereDistanceSql = this.makeWhereDistance(
      user.latitude,
      user.longitude,
      request.maxdistance
    );
    const selectDistanceSql = this.makeSelectDistance(user.latitude, user.longitude);
    const likesFilter = this.getLikesFilter(userId);
    const blockedFilter = this.getBlockedFilter(userId);
    let selectedTags = `, string_agg(tag.name::character varying, ', ' order by tag.name )  as tags `;

    const orderBy = this.getOrderBy(request.orderby, request.tags.length);
    const joinProfilePic = `FULL OUTER JOIN photos ON (users.id = photos.user_id AND photos.num = '0')`;
    let joinTags = ' JOIN  userstag on userstag.user_id=users.id JOIN TAG ON userstag.id = tag.id';

    let common_tags = '';
    let tags = request.tags;
    if (request.tags.length !== 0) {
      tags.forEach((tag) => (common_tags += `'` + tag + `',`));
      common_tags = common_tags.slice(0, -1);
    }
    let joinCommonTags =
      `
    inner join (select user_id, count(*) as common_tags from userstag ut JOIN tag ON tag.id = ut.tag_id  WHERE  tag.name in ( ` +
      common_tags +
      ` ) AND NOT user_id = ` +
      userId +
      ` group by ut.user_id) A ON users.id=A.user_id`;

    let groupBy = ' GROUP BY users.id, photos.uri, a.common_tags';
    // console.log(request.tags.length);
    if (request.tags.length === 0) {
      joinCommonTags = '';
      joinTags = '';
      selectedTags = '';
      groupBy = ' GROUP BY users.id, photos.uri';
    }
    // console.log(request.tags.length);
    // console.log(request.tags);
    const sql =
      "select   TO_CHAR(logged_in, 'DD/MM/YY HH24:MI') AS logged_in_string, fame, bio, firstname, lastname, gender, preference, username, users.id as id, " +
      selectDistanceSql +
      ', ' +
      'photos.uri as photo' +
      ', ' +
      'AGE(users.birthdate) as age' +
      selectedTags +
      ' from users ' +
      joinCommonTags +
      ' ' +
      joinTags +
      ' ' +
      joinProfilePic +
      '  WHERE (' +
      // tagsFilter +
      likesFilter +
      ') AND (' +
      blockedFilter +
      ') AND ' +
      preferenceSql +
      ' AND ' +
      ageFilter +
      ' AND users.id !=' +
      userId +
      ' AND ' +
      whereDistanceSql +
      groupBy +
      ' ' +
      orderBy +
      ' LIMIT ' +
      limit;

    // console.log(sql);
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
}

module.exports = Filter;
