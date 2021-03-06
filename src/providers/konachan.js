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

class Konachan extends Provider {
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
        return this._getPost('senko', [ Konachan.SAFE ])
      case 'KANNA':
        return this._getPost('kanna_kamui', [ Konachan.SAFE ])
      case 'YURI':
        return this._getPost('yuri', [ Konachan.SAFE, Konachan.QUESTIONABLE, Konachan.EXPLICIT ])
      case 'BDSM':
        return this._getPost('bondage', [ Konachan.SAFE, Konachan.QUESTIONABLE, Konachan.EXPLICIT ])
      case 'TIED':
        return this._getPost('bondage+rope', [ Konachan.SAFE, Konachan.QUESTIONABLE, Konachan.EXPLICIT ])
      case 'THIGH':
        return this._getPost('thighhighs', [ Konachan.SAFE ])
      case 'THIGH_NSFW':
        return this._getPost('thighhighs', [ Konachan.QUESTIONABLE, Konachan.EXPLICIT ])
      case 'NEKO':
        return this._getPost('cat', [ Konachan.SAFE ])
      case 'NEKO_NSFW':
        return this._getPost('cat', [ Konachan.QUESTIONABLE, Konachan.EXPLICIT ])
      case 'MAID':
        return this._getPost('maid', [ Konachan.SAFE ])
      case 'MAID_NSFW':
        return this._getPost('maid', [ Konachan.QUESTIONABLE, Konachan.EXPLICIT ])
      default:
        return null
    }
  }

  async _getPost (tag, ratings) {
    const allPosts = await fetch(`https://konachan.com/post.json?tags=${tag}&limit=500`).then(res => res.json())
    const posts = allPosts.filter(post => ratings.includes(post.rating) && !post.tags.split(' ').includes('trap'))
    const post = posts[Math.floor(Math.random() * posts.length)]
    return [
      post.file_url.split('.').pop(),
      await fetch(post.file_url)
    ]
  }
}

Konachan.SAFE = 's'
Konachan.QUESTIONABLE = 'q'
Konachan.EXPLICIT = 'e'

module.exports = Konachan
