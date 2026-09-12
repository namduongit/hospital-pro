namespace api.DTOs;

public class Pagination<T>
{
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPage { get; set; }
    public ICollection<T> Items { get; set; } = new List<T>();
}