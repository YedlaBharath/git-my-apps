using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using _7hillsapp.EmailClasses;
using _7hillsapp.Models;
using EmailServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace _7hillsapp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSpaStaticFiles(configure =>
            {
                configure.RootPath = "clientapp/build";
            });
            services.AddSignalR();
            
            // Here we made the dependence injection for 7HillsDBContext class. 
            services.AddDbContext<_7HillsDBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DevlopmentConnection")));

            services.AddCors();


            var emailConfiguration = Configuration.GetSection("EmailConfig").Get<EmailConfig>();
            services.AddSingleton(emailConfiguration);
            services.AddScoped<IEmailSenderInterface, EmailSenderClass>();


            var emailConfig = Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
                services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader());
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles(new StaticFileOptions
                {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
                RequestPath = "/Images"

            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/OwnerImages")),
                RequestPath = "/Images/OwnerImages"

            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/MenuImages")),
                RequestPath = "/Images/MenuImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/VegSnacksImages")),
                RequestPath = "/Images/VegSnacksImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/VegCurriesImages")),
                RequestPath = "/Images/VegCurriesImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/BiryaniImages")),
                RequestPath = "/Images/BiryaniImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/ChickenSnacksImages")),
                RequestPath = "/Images/ChickenSnacksImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/MuttonSnacksImages")),
                RequestPath = "/Images/MuttonSnacksImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/FishPrawnsSnacksImages")),
                RequestPath = "/Images/FishPrawnsSnacksImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/ChickenCurriesImages")),
                RequestPath = "/Images/ChickenCurriesImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/MuttonCurriesImages")),
                RequestPath = "/Images/MuttonCurriesImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/TandooriImages")),
                RequestPath = "/Images/TandooriImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/RotiNaanImages")),
                RequestPath = "/Images/RotiNaanImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/SaveCartImages")),
                RequestPath = "/Images/SaveCartImages"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images/BestOfSevenHillsImages")),
                RequestPath = "/Images/BestOfSevenHillsImages"
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSpa(Spa =>
            {
                Spa.Options.SourcePath = "clientapp";
                if(env.IsDevelopment())
                {
                    Spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
