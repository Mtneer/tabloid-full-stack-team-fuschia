using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    // Use the Authorize tag to require user authorization to any of the controller methods
    
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        // Define private properties for the PostController to link the relevant repositories.
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICategoryRepository _categoryRepository;

        // Create a Constructor Method to instantiate the controller
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository, ICategoryRepository categoryRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
            _categoryRepository = categoryRepository;
        }

        // This method is for the POSTS page.
        // it GETs the full List of Posts from the database.
        // GET: api/<PostController>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        // This method is for the MY POSTS page.
        // It GETs a List of Posts from the database by the UserId in SessionStorage
        // GET api/<PostController>/UserId
        [HttpGet("MyPosts/{UserId}")]
        public IActionResult MyPosts(int UserId)
        {
            // Use the "GetPostsByUserId" method in the PostRepository.cs
            // repository to retrieve all of the posts in the database
            // that have the same Post.UserId as the User who is currently
            // logged in (retrieve current User's Id from SessionStorage 
            // on client-side.
            var posts = _postRepository.GetPostsByUserId(UserId);
            return Ok(posts);
        }

        // This method is for the POST DETAILS page.
        // It GETs a Post from the database by the PostId
        // GET api/<PostController>/Details/id
        [HttpGet("/Details/{id}")]
        public void Details(int id)
        {
            //var post = _postRepository.GetPublishedPostById(id);
            //if (post == null)
            //{
            //    int userId = GetCurrentUserProfileId();
            //    post = _postRepository.GetUserPostById(id, userId);
            //    if (post == null)
            //    {
            //        return NotFound();
            //    }
            //}
            //return Ok(post);
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post(Post post)
        {
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            //try
            //{
            //    _postRepository.Edit(post);
            //    return RedirectToAction(nameof(Index));
            //}
            //catch
            //{
            //    return View();
            //}
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //try
            //{
            //    _postRepository.Delete(id);
            //    return RedirectToAction(nameof(Index));
            //}
            //catch
            //{
            //    return Ok();
            //}
        }

        private UserProfile GetCurrentUserProfileId()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}



        

    
