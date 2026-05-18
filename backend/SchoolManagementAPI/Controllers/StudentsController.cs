using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementAPI.Data;
using SchoolManagementAPI.DTOs;
using SchoolManagementAPI.Models;

namespace SchoolManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _db;
    public StudentsController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var students = await _db.Students
            .Include(s => s.Class)
            .ToListAsync();
        return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var student = await _db.Students
            .Include(s => s.Class)
            .FirstOrDefaultAsync(s => s.Id == id);
        if (student == null)
            return NotFound(new ResponseDto { Success = false, Message = "Not found" });
        return Ok(student);
    }

    [HttpGet("count")]
    public async Task<IActionResult> GetCount()
        => Ok(await _db.Students.CountAsync());

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(Student student)
    {
        var count = await _db.Students.CountAsync();
        student.AdmissionNo = $"S{(count + 1):D3}";
        _db.Students.Add(student);
        await _db.SaveChangesAsync();
        return Ok(new ResponseDto { Success = true, Message = "Student added", Data = student });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, Student updated)
    {
        var student = await _db.Students.FindAsync(id);
        if (student == null)
            return NotFound(new ResponseDto { Success = false, Message = "Not found" });

        student.FullName      = updated.FullName;
        student.Email         = updated.Email;
        student.Phone         = updated.Phone;
        student.Gender        = updated.Gender;
        student.Address       = updated.Address;
        student.ParentName    = updated.ParentName;
        student.ParentContact = updated.ParentContact;
        student.Status        = updated.Status;
        student.ClassId       = updated.ClassId;

        await _db.SaveChangesAsync();
        return Ok(new ResponseDto { Success = true, Message = "Updated", Data = student });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var student = await _db.Students.FindAsync(id);
        if (student == null)
            return NotFound(new ResponseDto { Success = false, Message = "Not found" });
        _db.Students.Remove(student);
        await _db.SaveChangesAsync();
        return Ok(new ResponseDto { Success = true, Message = "Deleted" });
    }
}