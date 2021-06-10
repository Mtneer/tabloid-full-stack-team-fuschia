using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/<CategoryControllercs>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_categoryRepository.GetAll());
        }

        // GET api/<CategoryControllercs>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CategoryControllercs>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CategoryControllercs>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoryControllercs>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
