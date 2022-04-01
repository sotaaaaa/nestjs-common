import { PipelineStage } from 'mongoose';

export interface AggregateLookupType {
  from: string;
  as: string;
  localField?: string;
  foreignField?: string;
  let?: Record<string, any>;
  pipeline?: Exclude<
    PipelineStage,
    PipelineStage.Merge | PipelineStage.Out | PipelineStage.Search
  >[];
}
