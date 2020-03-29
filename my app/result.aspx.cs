using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Registraion
{
    public partial class result : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected string GetConnection()
        {
            return ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        }
        protected void log_click(object sender, EventArgs e)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(GetConnection()))
                {
                    string sql = @"SELECT * FROM info WHERE email=@email AND password=@password";
                    using (SqlCommand sc = new SqlCommand(sql, con))
                    {
                        sc.Parameters.AddWithValue("@email", emailtxt.Text);
                        sc.Parameters.AddWithValue("@password", passtxt.Text);
                        using (SqlDataAdapter sda = new SqlDataAdapter(sc))
                        {
                            using (DataTable dt = new DataTable())
                            {
                                sda.Fill(dt);
                                con.Open();
                                sc.ExecuteNonQuery();
                                con.Close();
                                if (dt.Rows.Count > 0)
                                {
                                    Session["id"] = emailtxt.Text;
                                    Response.Redirect("WebForm2.aspx");
                                    Session.RemoveAll();
                                }
                                else
                                {
                                    msg.Text = "Invalid email or Password";
                                }
                            }
                        }
                        Clear();
                    }
                }
            }
            catch(SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        private void Clear()
        {
            emailtxt.Text = passtxt.Text = "";
        }
    }
}