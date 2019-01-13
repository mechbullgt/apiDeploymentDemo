import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Articles, { schema } from './model'

const router = new Router()
const { title, content } = schema.tree

/**
 * @api {post} /articles Create articles
 * @apiName CreateArticles
 * @apiGroup Articles
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Articles's title.
 * @apiParam content Articles's content.
 * @apiSuccess {Object} articles Articles's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Articles not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, content }),
  create)

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Articles
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of articles.
 * @apiSuccess {Object[]} rows List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /articles/:id Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Articles
 * @apiSuccess {Object} articles Articles's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Articles not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /articles/:id Update articles
 * @apiName UpdateArticles
 * @apiGroup Articles
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Articles's title.
 * @apiParam content Articles's content.
 * @apiSuccess {Object} articles Articles's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Articles not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, content }),
  update)

/**
 * @api {delete} /articles/:id Delete articles
 * @apiName DeleteArticles
 * @apiGroup Articles
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Articles not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
