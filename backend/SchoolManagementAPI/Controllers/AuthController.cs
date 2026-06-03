using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementAPI.Data;
using SchoolManagementAPI.DTOs;
using SchoolManagementAPI.Models;
using SchoolManagementAPI.Services;

namespace SchoolManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly JwtService  _jwt;

    public AuthController(AppDbContext db, JwtService jwt)
    {
        _db  = db;
        _jwt = jwt;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new ResponseDto { Success = false, Message = "Email and password are required" });

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return Unauthorized(new ResponseDto { Success = false, Message = "Invalid email or password" });

            var hash = user.Password.Replace("$2b$", "$2a$").Replace("$2y$", "$2a$");
            bool ok;
            try   { ok = BCrypt.Net.BCrypt.Verify(dto.Password, hash); }
            catch { ok = false; }

            if (!ok)
                return Unauthorized(new ResponseDto { Success = false, Message = "Invalid email or password" });

            var token = _jwt.GenerateToken(user);
            return Ok(new ResponseDto
            {
                Success = true,
                Message = "Login successful",
                Data    = new { token, user = new { user.Id, user.Name, user.Email, user.Role } }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ResponseDto { Success = false, Message = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest(new ResponseDto { Success = false, Message = "Email already exists" });

            var user = new User
            {
                Name     = dto.Name,
                Email    = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role     = dto.Role
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new ResponseDto { Success = true, Message = "Account created", Data = new { user.Id, user.Name, user.Email, user.Role } });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ResponseDto { Success = false, Message = ex.Message });
        }
    }

    [HttpGet("users")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _db.Users
                .Select(u => new { u.Id, u.Name, u.Email, u.Role, u.CreatedAt })
                .OrderByDescending(u => u.CreatedAt)
                .ToListAsync();
            return Ok(users);
        }
        catch (Exception ex) { return StatusCode(500, new ResponseDto { Success = false, Message = ex.Message }); }
    }

    [HttpDelete("users/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound(new ResponseDto { Success = false, Message = "User not found" });
            if (user.Role == "Admin") return BadRequest(new ResponseDto { Success = false, Message = "Cannot delete admin account" });
            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
            return Ok(new ResponseDto { Success = true, Message = "User deleted" });
        }
        catch (Exception ex) { return StatusCode(500, new ResponseDto { Success = false, Message = ex.Message }); }
    }

    [HttpPut("users/{id}/reset-password")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ResetPassword(int id, [FromBody] string newPassword)
    {
        try
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound(new ResponseDto { Success = false, Message = "User not found" });
            user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _db.SaveChangesAsync();
            return Ok(new ResponseDto { Success = true, Message = "Password reset successfully" });
        }
        catch (Exception ex) { return StatusCode(500, new ResponseDto { Success = false, Message = ex.Message }); }
    }
}