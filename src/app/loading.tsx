import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}