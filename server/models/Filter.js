const { link } = require('fs');
const pool = require('./db');
const User = require('./User');
class Filter {
  static getAgeFilter(mindate, maxdate) {
    const sql = '(birthdate BETWEEN ' + mindate + ' AND ' + maxdate + ')'; // between 1 AND 2
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
    const sql =
      "(gender='" + gender + "' AND (preference='both' OR preference='" + preference + "'))";
    return sql;
  }

  static zeroPad(d) {
    return ('0' + d).slice(-2);
  }

  static getLikesFilter(user) {
    return (
      'likes.liker_id IS NULL OR NOT likes.liker_id=' + user + " AND NOT users.id='" + user + "'"
    );
  }
  static getBlockedFilter(user) {
    return (
      'blocked.blocked_id IS NULL OR NOT blocked.blocked_id=' +
      user +
      " AND NOT users.id='" +
      user +
      "'"
    );
  }
  static getTagsFilter(user) {
    return (
      `inner join (select user_id, count(*) as common_tags from   userstag ut where  ut.tag_id in ( SELECT tag_id from userstag where user_id = ` +
      user +
      `) AND NOT user_id = ` +
      user +
      ` group by ut.user_id) A ON users.id=A.user_id`
    );
  }
  static async getFilterMatch(request) {
    console.log(request);
    const userId = request.id;
    const maxdistance = request.maxdistance;
    const limit = request.limit;

    const user = await User.getUser(userId);
    // const tags = await this.getTags(userId);
    // const tagsSql = this.makeTags(tags);
    const preferenceSql = this.makePreference(request.preference, user.gender);
    const ageFilter = this.getAgeFilter(request.mindate, request.maxdate);
    const whereDistanceSql = this.makeWhereDistance(user.latitude, user.longitude, maxdistance);
    const selectDistanceSql = this.makeSelectDistance(user.latitude, user.longitude);
    const likesFilter = this.getLikesFilter(userId);
    const blockedFilter = this.getBlockedFilter(userId);
    const orderBy = 'ORDER BY users.fame DESC';
    const joinLikes = 'FULL OUTER JOIN likes ON users.id = likes.user_id ';
    const joinBlocked = 'FULL OUTER JOIN blocked ON users.id = blocked.user_id ';
    const tagsFilter = this.getTagsFilter(userId);
    const sql =
      'select *, users.id as id, ' +
      selectDistanceSql +
      ' from users ' +
      joinLikes +
      ' ' +
      joinBlocked +
      ' /* ' +
      tagsFilter +
      ' */ WHERE (' +
      likesFilter +
      ') AND (' +
      blockedFilter +
      ') AND ' +
      preferenceSql +
      ' AND ' +
      ageFilter +
      ' AND ' +
      whereDistanceSql +
      ' ' +
      orderBy +
      ' LIMIT ' +
      limit;

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
}

module.exports = Filter;

// User.getUser(1).then((resp) => console.log(resp));
// Filter.getFilterMatch(1, 1000000, 'male', 'female', 'no', 'no', 5).then((resp) => console.log(resp));
