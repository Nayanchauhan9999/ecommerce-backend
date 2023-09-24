export const typesGraphQl = `

  type Category {
    id:ID
    name : String
    description : String
    createdAt : String
    updatedAt : String
  }

  type Product{
    id:ID
    title:String
    description:String
    categories : [String]
    price : Int
    policy : [String]
    quantity : Int
    rating : Float
    Reviews : [String]
    sizes : [Int]
    tags : [String]
    colors : [String]
    images : [String]
    brand : String
    brandLogo : String
    createdAt : String
    updatedAt : String
  }

  type Query {
  productList : [Product]
  categoryList : [Category]
  categoryById (id : ID!) : Category
  }

`;
