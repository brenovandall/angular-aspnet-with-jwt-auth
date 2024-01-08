namespace CodePulseAPI.Models;

public class Categoria
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string UrlCategoria { get; set; }
    public ICollection<Postagem> Postagens { get; set; }
}
