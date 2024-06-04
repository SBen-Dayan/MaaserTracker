using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MaaserTracker.Data.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_IncomeSources_IncomeSourceId",
                table: "Incomes");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_IncomeSources_IncomeSourceId",
                table: "Incomes",
                column: "IncomeSourceId",
                principalTable: "IncomeSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_IncomeSources_IncomeSourceId",
                table: "Incomes");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_IncomeSources_IncomeSourceId",
                table: "Incomes",
                column: "IncomeSourceId",
                principalTable: "IncomeSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
