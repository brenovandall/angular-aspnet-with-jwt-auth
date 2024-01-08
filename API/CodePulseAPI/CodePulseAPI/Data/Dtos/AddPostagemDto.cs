namespace CodePulseAPI.Data.Dtos;

public class AddPostagemDto
{
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public string Conteudo { get; set; }
    public string UrlImagem { get; set; }
    public string UrlPostagem { get; set; }
    public DateTime DataAdicionada { get; set; }
    public string Autor { get; set; }
    public bool Status { get; set; }
    public Guid[] Categorias { get; set; }
}
