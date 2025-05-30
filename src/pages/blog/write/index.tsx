// TODO : 디자인 및 실제 기능 구현 예정

import BlogUploadForm from '../../components/feat/BlogUploadForm';
import { createPostAction } from '../../../actions/blogUpload';

export default function WritePage() {
  return (
    <div className="container py-10">
      <BlogUploadForm createPostAction={createPostAction} />
    </div>
  );
}
