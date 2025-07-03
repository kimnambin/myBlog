import BlogUploadForm from '../../components/feat/write/BlogUploadForm';

export default function WritePage() {
    const key = process.env.NOTION_PAGE;

    
  return (
    <div className="container py-10">
      <BlogUploadForm />
        <a href={key} target="_blank" rel="noopener noreferrer">
          외부 링크로 이동
        </a>
    </div>
  );
}
