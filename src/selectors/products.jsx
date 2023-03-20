const excludeColumns = ["id", "images"];

export default (products, { filters, sort }) => {
  return products
    .filter((product) => {
      const { price, discount, gender, text, brand } = filters;

      let genderMatch = true;

      if (gender) {
        genderMatch = product.gender.toLowerCase() === gender.toLowerCase();
      }

      const lowercasedValue = text.toLowerCase().trim();
      let textMatch = false;

      if (!!lowercasedValue) {
        const filteredData = Object.keys(product).some((key) => {
          const currKey = product[key];
          return excludeColumns.includes(key)
            ? false
            : currKey?.toString().toLowerCase().includes(lowercasedValue);
        });
        textMatch = filteredData;
      } else {
        textMatch = true;
      }

      let discountRangeMatch = true;
      if (discount) {
        discountRangeMatch = product.discountPercent >= discount;
      }

      let priceMatch = false;
      for (let item of price) {
        const [start, end] = item.split("-");
        if (product.price >= parseInt(start) && product.price < parseInt(end))
          priceMatch = true;
      }
      priceMatch = price.length > 0 ? priceMatch : true;
      let brandMatch = true;
      if(brand.length > 0){
        brandMatch = brand.some(item => product.brandName.includes(item));
      }

      return genderMatch && priceMatch && discountRangeMatch && textMatch && brandMatch;
    })
    .sort((a, b) => {
      if (sort === "NEW") {
        return a.postedAt < b.postedAt ? 1 : -1;
      }
      if (sort === "POPULAR") {
        return a.rating < b.rating ? 1 : -1;
      }
      if (sort === "BETTER_DISCOUNT") {
        return a.discountPercent < b.discountPercent ? 1 : -1;
      }
      if (sort === "PRICE_HIGH_TO_LOW") {
        return a.price < b.price ? 1 : -1;
      }
      if (sort === "PRICE_LOW_TO_HIGH") {
        return a.price < b.price ? -1 : 1;
      } else return 1;
    });
};
