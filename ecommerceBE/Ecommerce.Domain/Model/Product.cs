﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using Ecommerce.Domain.Model.Common;

namespace Ecommerce.Domain.Model
{
    public class Product : BaseModel, ISoftDeleted
    {
        /// <summary>
        /// 
        /// </summary>
        public Product()
        {
            Categories = new HashSet<Category>();
        }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string AvailableStatus { get; set; }
        public object Configuration { get; set; }
        public ICollection<string> SpecialFeatures { get; set; }
        public Guid SupplierId { get; set; }
        public virtual Supplier Supplier { get; set; }
        public Guid ProductTypeId { get; set; }
        public virtual ProductType ProductType { get; set; }
        public decimal OriginalPrice { get; set; }
        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public bool IsDeleted { get; set; }
    }

    internal class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="builder"></param>
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable($"{MainDbContext.DbTablePrefix}{nameof(Product)}", MainDbContext.ProductSchema);
            builder.HasIndex(x => x.Name);
            builder.HasIndex(x => x.Slug);
            builder.HasIndex(x => x.SupplierId);
            builder.HasIndex(x => x.OriginalPrice);
            builder.HasIndex(x => x.ProductTypeId);
            builder.HasIndex(x => x.AvailableStatus);
            builder.HasIndex(x => x.Status);
            builder.Property(e => e.Configuration)
                .HasColumnType("jsonb")
                .HasDefaultValueSql("'{ }'::jsonb");
            builder.HasOne(x => x.ProductType).WithMany(x => x.Products).HasForeignKey(x => x.ProductTypeId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Supplier).WithMany(x => x.Products).HasForeignKey(x => x.SupplierId).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.SpecialFeatures).HasConversion(
                                v => string.Join(',', v),
                                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
            builder.HasQueryFilter(x => !x.IsDeleted);
        }
    }
}
