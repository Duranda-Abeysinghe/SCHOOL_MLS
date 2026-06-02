namespace SchoolManagementAPI.DTOs;

public class ClassDto
{
    public string  ClassName { get; set; } = "";
    public string? Section   { get; set; }
    public int?    TeacherId { get; set; }
}