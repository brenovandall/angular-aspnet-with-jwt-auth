using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodePulseAPI.Migrations
{
    /// <inheritdoc />
    public partial class adicionandonovascolunas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoriaPostagem",
                columns: table => new
                {
                    CategoriasId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PostagensId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriaPostagem", x => new { x.CategoriasId, x.PostagensId });
                    table.ForeignKey(
                        name: "FK_CategoriaPostagem_Categorias_CategoriasId",
                        column: x => x.CategoriasId,
                        principalTable: "Categorias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoriaPostagem_Postagens_PostagensId",
                        column: x => x.PostagensId,
                        principalTable: "Postagens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CategoriaPostagem_PostagensId",
                table: "CategoriaPostagem",
                column: "PostagensId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoriaPostagem");
        }
    }
}
