import { GraphQLScalarType, Kind } from 'graphql';

// Définition du Scalar GeoJSON
export const GeoJSONScalar = new GraphQLScalarType({
  name: 'GeoJSON',
  description: 'A custom scalar type for GeoJSON data',

  // La méthode qui gère la réception des données du client
  parseValue(value) {
    return value; // Ici, tu peux transformer la valeur si nécessaire
  },

  // La méthode qui gère l'envoi des données vers le client
  serialize(value) {
    return value; // Ici, tu peux manipuler ou formater les données avant de les renvoyer
  },

  // La méthode qui gère l'AST des données venant de la requête GraphQL
  parseLiteral(ast) {
    if (ast.kind === Kind.OBJECT) {
      // Si c'est un objet, on traite ses champs
      const geoJson = {};
      ast.fields.forEach((field) => {
        if (
          field.value.kind === Kind.STRING ||
          field.value.kind === Kind.INT ||
          field.value.kind === Kind.FLOAT
        ) {
          geoJson[field.name.value] = field.value.value; // Récupérer la valeur directement pour les types primitifs
        }
      });
      return geoJson;
    }
    // Retourner null si ce n'est pas un objet
    return null;
  },
});
