import { ModelService } from "../model/model.service";
import { CollectionService } from "../collection/collection.service";
export interface EndpointInterface {
    endpoint(endpoint: string): ModelService | CollectionService;
    posts(): ModelService | CollectionService;
    users(): ModelService | CollectionService;
    categories(): ModelService | CollectionService;
    pages(): ModelService | CollectionService;
    tags(): ModelService | CollectionService;
    comments(): ModelService | CollectionService;
    media(): ModelService | CollectionService;
    taxonomies(): ModelService | CollectionService;
    statuses(): ModelService | CollectionService;
    types(): ModelService | CollectionService;
}
