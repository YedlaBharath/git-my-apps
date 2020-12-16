using Microsoft.EntityFrameworkCore.Migrations;

namespace _7hillsapp.Migrations
{
    public partial class OwnersCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OwnerDetailsModels",
                columns: table => new
                {
                    OwnerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OwnerUserName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OwnerPassword = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OwnerEmail = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OwnerAdress = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OwnerImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnerDetailsModels", x => x.OwnerId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OwnerDetailsModels");
        }
    }
}
