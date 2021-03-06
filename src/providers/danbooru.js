/**
 * A random image service for weebs because weebs are superior
 * Copyright (C) 2019 Weeb Services
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const fetch = require('node-fetch')
const Provider = require('./provider')

class Danbooru extends Provider {
  constructor () {
    super([
      'SENKO', 'KANNA', 'YURI',
      'BDSM', 'TIED',
      'THIGH', 'THIGH_NSFW',
      'NEKO', 'NEKO_NSFW',
      'MAID', 'MAID_NSFW'
    ])
  }

  provide (type) {
    switch (type) {
      case 'SENKO':
        return this._getPost('senko_(sewayaki_kitsune_no_senko-san)', [ Danbooru.SAFE ])
      case 'KANNA':
        return this._getPost('kanna_kamui', [ Danbooru.SAFE ])
      case 'YURI':
        return this._getPost('yuri', [ Danbooru.SAFE, Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
      case 'BDSM':
        return this._getPost('bdsm', [ Danbooru.SAFE, Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
      case 'TIED':
        return this._getPost('bound', [ Danbooru.SAFE, Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
      case 'THIGH':
        return this._getPost('thighs', [ Danbooru.SAFE ])
      case 'THIGH_NSFW':
        return this._getPost('thighs', [ Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
      case 'NEKO':
        return this._getPost('cat', [ Danbooru.SAFE ])
      case 'NEKO_NSFW':
        return this._getPost('cat', [ Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
      case 'MAID':
        return this._getPost('maid', [ Danbooru.SAFE ])
      case 'MAID_NSFW':
        return this._getPost('maid', [ Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
      default:
        return null
    }
  }

  async _getPost (tag, ratings) {
    const allPosts = await fetch(`https://danbooru.donmai.us/posts.json?tags=${tag}&limit=200`).then(res => res.json())
    const posts = allPosts.filter(post => !post.is_pending && post.file_url && ratings.includes(post.rating) && !post.tag_string.split(' ').includes('trap'))
    const post = posts[Math.floor(Math.random() * posts.length)]
    return [
      post.file_url.split('.').pop(),
      await fetch(post.file_url)
    ]
  }
}

Danbooru.SAFE = 's'
Danbooru.QUESTIONABLE = 'q'
Danbooru.EXPLICIT = 'e'

module.exports = Danbooru
