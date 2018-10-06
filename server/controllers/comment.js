const DB = require('../utils/db')

module.exports = {

    /**
     * 添加评论
     */
    // add: async ctx => {
    //     let user = ctx.state.$wxInfo.userinfo.openId
    //     let username = ctx.state.$wxInfo.userinfo.nickName
    //     let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    //     let movieId = +ctx.request.body.movie_id
    //     let content = ctx.request.body.content
    //     let audio = ctx.request.body.audio

    //     if(!isNaN(movieId)) {
    //         await DB.query('INSERT INTO movie_comment(user, username, avatar, content, audio, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, audio, movieId])
    //     }
    //     ctx.state.data = {}
    // },
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let username = ctx.state.$wxInfo.userinfo.nickName
        let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
        let movieId = +ctx.request.body.movie_id
        let content = ctx.request.body.content || null

        let audio = ctx.request.body.audio || null

        if (!isNaN(movieId)) {
            await DB.query('INSERT INTO movie_comment(user, username, avatar, content, audio, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, audio, movieId])
        }
        ctx.state.data = {}
    },

    /**
     * 获取某部电影的所有评论
     */

     list: async ctx => {
         let movieId = +ctx.request.query.movie_id

         if(!isNaN(movieId)) {
             ctx.state.data = await DB.query('select * from movie_comment where movie_comment.movie_id = ?', [movieId])
         } else {
             ctx.state.data = []
         }
     }

}