using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    /*This class is about the Database and the connection that we will be using*/
    public class _7HillsDBContext : DbContext
    {
        public _7HillsDBContext(DbContextOptions<_7HillsDBContext> options) : base(options)
        {

        }
        public DbSet<DB7Hills> DB7Hills {get;set; }

        public DbSet<DB7HillsItems> DB7HillsItems { get; set; }
        public DbSet<DB7HillsItemsNew> DB7HillsItemsNews { get; set; }
        public DbSet<DB7HillsInsertItems> DB7HillsInsertItems { get; set; }
        public DbSet<OwnerDetailsModel> OwnerDetailsModels { get; set; }
        public DbSet<SignupModel> signupModels { get; set; }
        public DbSet<MenuModel> Menus { get; set; }
        public DbSet<VegSnacksModel> vegSnacks { get; set; }
        public DbSet<VegCurries> vegCurries { get; set; }
        public DbSet<BiryaniModel> biryaniModels { get; set; }
        public DbSet<ChickenSnacksModel> chickenSnacks { get; set; }
        public DbSet<MuttonSnacksModel> muttonSnacks { get; set; } 
        public DbSet<FishPrawnsSnacksModel> fishPrawnsSnacks { get; set; }
        public DbSet<ChickenCurriesModel> chickenCurries { get; set; }
        public DbSet<MuttonCurriesModel> muttonCurries { get; set; }
        public DbSet<TandooriModel> tandoori { get; set; }
        public DbSet<RotiNaanModel> rotiNaans { get; set; }
        public DbSet<AddCartItems> cartItems { get; set; }
        public DbSet<UserSignupModel> userSignupModels { get; set; }
        public DbSet<NewUserSignUpModel> newUserSignUps { get; set; }
        public DbSet<UserLoginModel> loginModels { get; set; }
        public DbSet<AddToCartModel> addToCarts { get; set; }
        public DbSet<SignUpUserModel> signUpUsers { get; set; }
        public DbSet<DummyClass> dummies { get; set; }
        public DbSet<SignUpUserNewModel> signUpUserNew { get; set; }
        public DbSet<BestOfSevenHillsModel> bestOfSevenHills { get; set; }
    }
}
