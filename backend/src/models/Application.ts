import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  userId: Types.ObjectId;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'applied' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: Date;
  updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String, trim: true },
    coverLetter: { type: String, trim: true },
    status: { type: String, enum: ['applied', 'reviewed', 'accepted', 'rejected'], default: 'applied' },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IApplication>('Application', ApplicationSchema);
