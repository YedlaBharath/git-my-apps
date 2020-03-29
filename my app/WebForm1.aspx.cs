using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Configuration;

namespace Registraion
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        private const string ConnectionString = @"Data Source=DESKTOP-NOOGA7E;Initial Catalog=users;Integrated Security=True";
        protected string getConnection()
        {
            return ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        }
        protected void register_click(object sender, EventArgs e)
        {

            int count = 0;
            HashSet<char> specialCharacters = new HashSet<char>() { '%', '$', '#' };
            try
            {
                if (password.Text.Any(char.IsLower))

                    count++;
                if (password.Text.Any(char.IsUpper))

                    count++;
                if (password.Text.Any(char.IsDigit))

                    count++;
                if (password.Text.Any(specialCharacters.Contains))

                    count++;
                if (count >= 3)
                {
                    using (SqlConnection con = new SqlConnection(getConnection()))
                    {
                        string sql = @"INSERT INTO info (id,username,email,password,gender,country) VALUES(@id,@username,@email,@password,@gender,@country)";
                        using (SqlCommand sc = new SqlCommand(sql, con))
                        {
                            sc.CommandType = CommandType.Text;
                            sc.Parameters.AddWithValue("@id", id.Text);
                            sc.Parameters.AddWithValue("@username", username.Text);
                            sc.Parameters.AddWithValue("@email", email.Text);
                            sc.Parameters.AddWithValue("@password", password.Text);
                            sc.Parameters.AddWithValue("@gender", gender.SelectedItem.Text);
                            sc.Parameters.AddWithValue("@country", country.SelectedValue);
                            con.Open();
                            sc.ExecuteNonQuery();
                            Clear();
                        }
                    }
                }
                else
                {
                    msg.Text = "The password must contain atlest one {a-z,A-Z,0-9}";
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void Clear()
        {
            username.Text = email.Text = password.Text = genderlabel.Text = country.Text = "";
        }
    }
}

    
