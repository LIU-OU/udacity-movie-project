const DB = require('../utils/db.js')


module.exports = {

    list: async ctx => {
      //  ctx.state.data = {
      //      "id": 22
      //  }

        ctx.state.data = await DB.query('select * from movies ORDER BY comment_count')
    },
    /**
     * 获取具体某部电影
     */
    detail: async ctx => {
        let movieId = + ctx.params.id 
        let movie 
        if(!isNaN(movieId)) {
            movie = (await DB.query('select * from movies where movies.id = ?', [movieId]))[0]
        } else {
            movie = {}
        }
        ctx.state.data = movie
        
    },

    /**
     * 获取电影列表
     */
   
}