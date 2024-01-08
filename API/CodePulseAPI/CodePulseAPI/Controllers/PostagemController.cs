using CodePulseAPI.Data;
using CodePulseAPI.Data.Dtos;
using CodePulseAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Validations;

namespace CodePulseAPI.Controllers;
[Authorize(Roles = "writer")]
[Route("api/[controller]")]
[ApiController]
public class PostagemController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostagemController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Adicionar([FromBody] AddPostagemDto dto)
    {
        var model = new Postagem
        {
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            Conteudo = dto.Conteudo,
            UrlImagem = dto.UrlImagem,
            UrlPostagem = dto.UrlPostagem,
            DataAdicionada = dto.DataAdicionada,
            Autor = dto.Autor,
            Status = dto.Status,
            Categorias = new List<Categoria>()
        };

        foreach (var item in dto.Categorias)
        {

            var categoriasProcuradas = _context.Categorias.FirstOrDefault(x => x.Id == item);
            if (categoriasProcuradas != null)
            {
                model.Categorias.Add(categoriasProcuradas);
            }
        }

        if (model is not null)
        {
            await _context.Postagens.AddAsync(model);
            await _context.SaveChangesAsync();

            var readModel = new ReadPostagemDto
            {
                Id = model.Id,
                Descricao = model.Descricao,
                UrlImagem = model.Conteudo,
                UrlPostagem = model.UrlPostagem,
                DataAdicionada = model.DataAdicionada,
                Autor = model.Autor,
                Status = model.Status,
                Categorias = model.Categorias.Select(x => new ReadCategoriaDto
                {
                    Id = x.Id,
                    Nome = x.Nome,
                    UrlCategoria = x.UrlCategoria
                }).ToList()
            };

            return CreatedAtAction("Adicionar", readModel);
        }

        return NotFound();
    }

    [HttpGet]
    public async Task<IActionResult> ListarPostagens()
    {
        var postagens = await _context.Postagens.Include(x => x.Categorias).ToListAsync();

        if (postagens is not null && postagens.Any())
        {
            var listaDeDtos = new List<ReadPostagemDto>();
            var listaDeCategorias = new List<ReadCategoriaDto>();

            foreach (var postagem in postagens)
            {
                var post = new ReadPostagemDto
                {
                    Id = postagem.Id,
                    Titulo = postagem.Titulo,
                    Descricao = postagem.Descricao,
                    Conteudo = postagem.Conteudo,
                    UrlImagem = postagem.UrlImagem,
                    UrlPostagem = postagem.UrlPostagem,
                    DataAdicionada = postagem.DataAdicionada,
                    Autor = postagem.Autor,
                    Status = postagem.Status,
                    Categorias = postagem.Categorias.Select(x => new ReadCategoriaDto
                    {
                        Id = x.Id,
                        Nome = x.Nome,
                        UrlCategoria = x.UrlCategoria
                    }).ToList()
                };

                listaDeDtos.Add(post);
            }

            return Ok(listaDeDtos);
        }

        return NotFound();
    }
}
