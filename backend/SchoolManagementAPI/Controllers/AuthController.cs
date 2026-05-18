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
    private readonly JwtService _jwt;

    public AuthController(AppDbContext db, JwtService jwt)
    {
        _db  = db;
        _jwt = jwt;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            return Unauthorized(new ResponseDto
            {
                Success = false,
                Message = "Invalid email or password"
            });

        var token = _jwt.GenerateToken(user);

        return Ok(new ResponseDto
        {
            Success = true,
            Message = "Login successful",
            Data = new
            {
                token,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Role
                }
            }
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest(new ResponseDto
            {
                Success = false,
                Message = "Email already exists"
            });

        var user = new User
        {
            Name     = dto.Name,
            Email    = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role     = dto.Role
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok(new ResponseDto
        {
            Success = true,
            Message = "Registered successfully",
            Data = new { user.Id, user.Name, user.Email, user.Role }
        });
    }
}