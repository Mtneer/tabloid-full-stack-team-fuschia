using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Repositories
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        //private readonly ICategoryRepository _categoryRepository;

        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
            //_categoryRepository = categoryRepository;
        }

        // GET: api/<PostController>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // GET api/<PostController>/firebaseUserId
        [HttpGet("{firebaseUserId}")]
        public void MyPostsIndex(int firebaseUserId)
        {
            //int currentUserId = GetCurrentUserProfileId();
            //var posts = _postRepository.GetPostsByUserId(currentUserId);
            //return Ok(posts);
        }

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
        public void Post([FromBody] string value)
        {
            //var vm = new PostCreateViewModel();
            //vm.CategoryOptions = _categoryRepository.GetAll();
            //return Ok();
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



        

    
