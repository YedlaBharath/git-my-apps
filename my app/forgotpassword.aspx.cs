using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Net.Mail;
using System.Drawing;

namespace Registraion
{
    public partial class forgotpassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }
        protected void forgotpassword_click(object sender, EventArgs e)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(getConnection()))
                {
                    string sql = "SELECT email,password FROM info WHERE email=@email";
                    using (SqlCommand sc = new SqlCommand(sql, con))
                    {
                        sc.Parameters.AddWithValue("@email", txtemail.Text);
                        con.Open();

                        using (SqlDataReader sdr = sc.ExecuteReader())
                        {
                            if (sdr.Read())
                            {
                                string email = sdr["email"].ToString();
                                string password = sdr["password"].ToString();

                                MailMessage mm = new MailMessage("bharathkumarreddy.yedla@studentmail.unicas.it", txtemail.Text);
                                mm.Subject = "Your Password";
                                mm.Body = string.Format("Hello <h2>{0}</h2> This is Your Password <h2>{1}</h2>", email, password);
                                mm.IsBodyHtml = true;
                                
                                SmtpClient smtp = new SmtpClient();
                                smtp.Host = "smtp.gmail.com";
                                smtp.EnableSsl = true;

                                smtp.UseDefaultCredentials = true;
                                NetworkCredential nc = new NetworkCredential();
                                nc.UserName = "bharathkumarreddy.yedla@studentmail.unicas.it";
                                nc.Password = "arun5858";
                                
                                
                                smtp.Credentials = nc;
                                smtp.Port = 587;
                                smtp.Send(mm);

                                msg1.Text = "Your password has been successfuly sent to " + txtemail.Text;
                                msg1.ForeColor = Color.Green;
                            }
                            else
                            {
                                msg1.Text = "Email is not correct";
                                msg1.ForeColor = Color.Red;
                            }
                        }
                        con.Close();
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        protected string getConnection()
        {
            return ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        }
    }
}