<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Registraion.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        .validation {
            color:red;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" >
        <div>
            <center>
            <h2>User Registraion form</h2>
                <fieldset style="border-radius:35px; text-align:left;padding-left:35px;height:300px;width:300px;">
            <table>
                <tr>
                    <td>
                        <asp:Label ID="labelid" runat="server" Text="ID"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="id" runat="server" TextMode="Number"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="usernamelabel" runat="server" Text="Username"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="username" runat="server"></asp:TextBox>
                    </td>
                    <td>
                         <asp:RequiredFieldValidator ID="userv" runat="server" ControlToValidate="username" Display="Dynamic" ErrorMessage="Please Enter Your Username" SetFocusOnError="True" CssClass="validation"></asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="emaillabel" runat="server" Text="Email"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="email" runat="server" TextMode="Email" ></asp:TextBox>
                    </td>
                    <td>
                        <asp:RequiredFieldValidator ID="emailv" runat="server" ControlToValidate="email" Display="Dynamic" ErrorMessage="Please Enter Your Email" SetFocusOnError="True" Font-Bold="False" CssClass="validation"></asp:RequiredFieldValidator>
                    </td>
                </tr>
                 
                <tr>
                    <td>
                        <asp:Label ID="passwordlabel" runat="server" Text="Password"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="password" runat="server" TextMode="Password" ></asp:TextBox>
                    </td>
                    <td>
                        <asp:RequiredFieldValidator ID="passv" runat="server" ControlToValidate="Password" Display="Dynamic" ErrorMessage="Please Enter Your Password" SetFocusOnError="True" CssClass="validation"></asp:RequiredFieldValidator>
                    </td>
                    <td>
                        <asp:Label ID="msg" runat="server"></asp:Label>
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <asp:Label ID="conformpasswordlabel" runat="server" Text="Conform Password"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="conformpassword" runat="server" TextMode="Password"></asp:TextBox>
                    </td>
                    <td>
                        <asp:CompareValidator ID="cv" runat="server" ControlToCompare="conformpassword" ControlToValidate="password" Display="Dynamic" ErrorMessage="Enter same Password" SetFocusOnError="True" CssClass="validation"></asp:CompareValidator>
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <asp:Label ID="genderlabel" runat="server" Text="Gender"></asp:Label>
                    </td>
                    <td>
                        <asp:RadioButtonList ID="gender" runat="server">
                            <asp:ListItem>Male</asp:ListItem>
                            <asp:ListItem>Female</asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="countrylabel" runat="server" Text="Country"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="country" runat="server">
                            <asp:ListItem Value="please select">Please select</asp:ListItem>
                            <asp:ListItem>INDIA</asp:ListItem>
                            <asp:ListItem>AUSTRALIA</asp:ListItem>
                            <asp:ListItem>ITALY</asp:ListItem>
                            <asp:ListItem>USA</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                 <tr>
                     <td>
                        <asp:Button ID="userbtn" runat="server" Text="Register" OnClick="register_click" />
                    </td>
                    <td>
                        <asp:HyperLink ID="loglink" runat="server" NavigateUrl="~/result.aspx" Text="Login"></asp:HyperLink>
                    </td>
                </tr>
            </table>
                    </fieldset>
                </center>
        </div>
        
    </form>
</body>
</html>
