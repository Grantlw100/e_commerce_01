import Joi from "joi";

export const recommendationValidation = {
    RecommendationInput: Joi.object({
        metadata: Joi.object({
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            version: Joi.number(),
            recommendationFor: Joi.string(),
            recommendationId: Joi.string(),
        }),
        Keywords: Joi.array().items(
            Joi.object({
                keyword: Joi.string(),
                points: Joi.number(),
            })
        ),
        Categories: Joi.array().items(
            Joi.object({
                category: Joi.string(),
                points: Joi.number(),
            })
        ),
        Seasons: Joi.array().items(
            Joi.object({
                season: Joi.string(),
                points: Joi.number(),
            })
        ),
        Promotions: Joi.array().items(
            Joi.object({
                promotion: Joi.string(),
                points: Joi.number(),
            })
        ),
        Stores: Joi.array().items(
            Joi.object({
                store: Joi.string(),
                points: Joi.number(),
            })
        ),
        direct: Joi.array().items(
            Joi.object({
                product: Joi.string(),
                points: Joi.number(),
            })
        ),
        indirect: Joi.array().items(
            Joi.object({
                characteristicName: Joi.string(),
                points: Joi.number(),
            })
        ),
        recommendedProducts: Joi.array().items(
            Joi.object({
                product: Joi.string(),
                points: Joi.number(),
            })
        ),
    }),
    RecommendationMetadataInput: Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        version: Joi.number(),
        recommendationFor: Joi.string(),
        recommendationId: Joi.string(),
    }),
    KeyWordRecommendsInput: Joi.object({
        keyword: Joi.string(),
        points: Joi.number(),
    }),
    CategoryRecommendsInput: Joi.object({
        category: Joi.string(),
        points: Joi.number(),
    }),
    SeasonRecommendsInput: Joi.object({
        season: Joi.string(),
        points: Joi.number(),
    }),
    PromotionRecommendsInput: Joi.object({
        promotion: Joi.string(),
        points: Joi.number(),
    }),
    StoreRecommendsInput: Joi.object({
        store: Joi.string(),
        points: Joi.number(),
    }),
    DirectInput: Joi.object({
        product: Joi.string(),
        points: Joi.number(),
    }),
    IndirectInput: Joi.object({
        characteristicName: Joi.string(),
        points: Joi.number(),
    }),
    ProductRecommendsInput: Joi.object({
        product: Joi.string(),
        points: Joi.number(),
    }),
};
