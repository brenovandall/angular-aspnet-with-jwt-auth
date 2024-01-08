using CodePulseAPI.Data;
using CodePulseAPI.Data.Dtos;
using CodePulseAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace CodePulseAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriaController : ControllerBase
{

    private readonly AppDbContext _context;

    public CategoriaController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Authorize(Roles = "writer")]
    public async Task<IActionResult> AdicionarCategoria(AddCategoriaDto addCategoriaDto)
    {
        var categoria = new Categoria()
        {
            Nome = addCategoriaDto.Nome,
            UrlCategoria = addCategoriaDto.UrlCategoria
        };

        if (categoria is not null)
        {
            await _context.Categorias.AddAsync(categoria);
            await _context.SaveChangesAsync();

            var modelRead = new ReadCategoriaDto()
            {
                Id = categoria.Id,
                Nome = categoria.Nome,
                UrlCategoria = categoria.UrlCategoria
            };

            if (modelRead is not null)
            {
                return Ok(modelRead);
            }

            return NotFound();
        }

        return NotFound();
    }

    [HttpGet]
    [Authorize(Roles = "writer")]
    public async Task<IActionResult> ListarCategorias()
    {
        var categorias = await _context.Categorias.ToListAsync();

        var listaDto = new List<ReadCategoriaDto>();

        foreach (var item in categorias)
        {
            var novoItem = new ReadCategoriaDto()
            {
                Id = item.Id,
                Nome = item.Nome,
                UrlCategoria = item.UrlCategoria
            };

            listaDto.Add(novoItem);
        }

        if (listaDto is not null && listaDto.Any())
        {
            return Ok(listaDto);
        }

        return NotFound();
    }


    [HttpGet("{id}")]
    [Authorize(Roles = "writer")]
    public async Task<IActionResult> Update([FromRoute] Guid id)
    {
        var categoriaSelecionada = await _context.Categorias.FirstOrDefaultAsync(x => x.Id == id);

        if (categoriaSelecionada != null)
        {
            var novoModelParaEditar = new UpdateCategoriaDto
            {
                Id = categoriaSelecionada.Id,
                Nome = categoriaSelecionada.Nome,
                UrlCategoria = categoriaSelecionada.UrlCategoria
            };

            if (novoModelParaEditar != null)
            {
                return Ok(novoModelParaEditar);
            }
        }

        return NotFound();
    }

    [HttpPut]
    [Route("{id:Guid}")]
    [Authorize(Roles = "writer")]
    public async Task<IActionResult> Update([FromRoute] Guid id, UpdateCategoriaDto dto)
    {
        var categoriaSelecionada = await _context.Categorias.FirstOrDefaultAsync(x => x.Id == id);
        
        if (categoriaSelecionada != null)
        {
            categoriaSelecionada.Nome = dto.Nome;
            categoriaSelecionada.UrlCategoria = dto.UrlCategoria;

            await _context.SaveChangesAsync();

            var novoModel = new ReadCategoriaDto
            {
                Id = categoriaSelecionada.Id,
                Nome = categoriaSelecionada.Nome,
                UrlCategoria = categoriaSelecionada.UrlCategoria,
            };

            return Ok(novoModel);
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "writer")]
    public async Task<IActionResult> DeletarCategoria([FromRoute] Guid id)
    {
        var categoriaExluida = await _context.Categorias.FirstOrDefaultAsync(x => x.Id == id);

        if (categoriaExluida != null)
        {
            _context.Categorias.Remove(categoriaExluida);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        return NoContent();
    }
}
