import { AnyObject, PipelineStage } from 'mongoose';
import { AggregateLookupType } from './interfaces/aggregate-builder';
import _ from 'lodash';

class AggregateBuilder<T = any> {
  public readonly aggregate: PipelineStage[];

  constructor(aggregate = []) {
    this.aggregate = aggregate;
  }

  public match(match: AnyObject) {
    const clean = _.head(_.without([match], undefined));
    if (_.size(clean) === 0) return this;
    this.aggregate.push({ $match: clean });
    return this;
  }

  public lookup(lookup: AggregateLookupType) {
    this.aggregate.push({ $lookup: lookup });
    return this;
  }

  public limit(limit: number) {
    this.aggregate.push({ $limit: limit });
    return this;
  }

  public skip(skip: number) {
    this.aggregate.push({ $skip: skip });
    return this;
  }

  public count(name: string) {
    this.aggregate.push({ $count: name });
    return this;
  }

  public group(data: PipelineStage.Group['$group']) {
    this.aggregate.push({ $group: data });
    return this;
  }

  public project(data: PipelineStage.Project['$project']) {
    this.aggregate.push({ $project: data });
    return this;
  }

  public unwind(data: PipelineStage.Unwind['$unwind']) {
    this.aggregate.push({ $unwind: data });
    return this;
  }

  public addFields(data: Partial<T>) {
    this.aggregate.push({ $addFields: data });
    return this;
  }

  public sort(key: keyof T, value: 1 | -1) {
    this.aggregate.push({ $sort: { key: value } });
    return this;
  }

  public build() {
    return this.aggregate;
  }
}

export default AggregateBuilder;
