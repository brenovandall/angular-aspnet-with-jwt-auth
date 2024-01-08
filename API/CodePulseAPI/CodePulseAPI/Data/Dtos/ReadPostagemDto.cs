namespace CodePulseAPI.Data.Dtos;

public class ReadPostagemDto
{
    public Guid Id { get; set; }
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public string Conteudo { get; set; }
    public string UrlImagem { get; set; }
    public string UrlPostagem { get; set; }
    public DateTime DataAdicionada { get; set; }
    public string Autor { get; set; }
    public bool Status { get; set; }
    public List<ReadCategoriaDto> Categorias { get; set; } = new List<ReadCategoriaDto>();
}
