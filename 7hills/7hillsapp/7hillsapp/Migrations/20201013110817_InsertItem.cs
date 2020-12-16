using Microsoft.EntityFrameworkCore.Migrations;

namespace _7hillsapp.Migrations
{
    public partial class InsertItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DB7HillsInsertItems",
                columns: table => new
                {
                    ItemId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    ItemImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DB7HillsInsertItems", x => x.ItemId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DB7HillsInsertItems");
        }
    }
}
