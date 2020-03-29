<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="Registraion.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        .logclass {
            text-align: right;
            margin-left: auto;
        }
        
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="logclass" draggable="true"><asp:Button ID="logoutbtn" runat="server" OnClick="logout_click" Text="Logout" CssClass="logclass" BorderStyle="Dashed"/></div>
        <div>
            <h2>successfully Logged in</h2>
            <h2>WELCOME TO <asp:Label ID="labelemail" runat="server"></asp:Label></h2><br />
            <br />
            <asp:TextBox ID="searchbyusername" runat="server"></asp:TextBox>
            <asp:Button ID="searchbtn" runat="server" OnClick="search_click" Text="Search By Username"/><br /><hr />
            <asp:Button ID="listofusers" runat="server" OnClick="list_click" Text="List of Users" />
        </div>
    </form>
    
    <h2>LIST VIEW</h2>
    <asp:ListView ID="lv" runat="server">
        <ItemTemplate>
            <table border="0" style="letter-spacing: normal; padding: 5px; margin: 2px">
                <tr>
                    <th>
                        <asp:Label runat="server" Text="ID"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Username"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="password"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Email"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Gender"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Country"></asp:Label>
                    </th>
                </tr>
                <tr>
                    <td >
                       <%# Eval("id") %>
                    </td>
                    <td>
                        <%# Eval("username") %>
                    </td>
                    <td>
                        <%# Eval("password") %>
                    </td>
                    <td>
                        <%# Eval("email") %>
                    </td>
                    <td>
                        <%# Eval("gender") %>
                    </td>
                    <td>
                        <%# Eval("country") %>
                    </td>
                </tr>
            </table>
        </ItemTemplate>
    </asp:ListView>
    <h2>DATA LIST</h2>
    <asp:DataList ID="dl" runat="server">
        <ItemTemplate>
            <table border="0" style="letter-spacing: normal; padding: 5px; margin: 2px">
                <tr>
                    <th>
                        <asp:Label runat="server" Text="ID"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Username"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="password"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Email"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Gender"></asp:Label>
                    </th>
                    <th>
                        <asp:Label runat="server" Text="Country"></asp:Label>
                    </th>
                </tr>
                <tr>
                    <td >
                       <%# Eval("id") %>
                    </td>
                    <td>
                        <%# Eval("username") %>
                    </td>
                    <td>
                        <%# Eval("password") %>
                    </td>
                    <td>
                        <%# Eval("email") %>
                    </td>
                    <td>
                        <%# Eval("gender") %>
                    </td>
                    <td>
                        <%# Eval("country") %>
                    </td>
                </tr>
            </table>
        </ItemTemplate>
    </asp:DataList>
   <h2>Grid View</h2>
    <asp:DataGrid ID="dg" runat="server" DataSourceID="SqlDataSource1">
    </asp:DataGrid>
    <asp:SqlDataSource runat="server" ID="SqlDataSource1" ConnectionString='<%$ ConnectionStrings:DBConnectionString %>' SelectCommand="SELECT * FROM [info]"></asp:SqlDataSource>
</body>
</html>
