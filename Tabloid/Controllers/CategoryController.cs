﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
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

        // GET: api/<CategoryController>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_categoryRepository.GetAll());
        }

        // This method is for Category DETAILS for edit form page.
        // It GETs a category from the database by the CategoryId
        // GET api/<PostController>/Details/id
        //[HttpGet("Details/{id}")]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Category(Category category)
        {
            _categoryRepository.Add(category);
            return Ok(category);
        }

        // PUT api/<CategoryController>/5
        [HttpPut]
        public IActionResult Put(Category category)
        {
            _categoryRepository.Edit(category);
            return NoContent();
        }

        // DELETE api/<CategoryControllercs>/5

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }
    }
}
    

