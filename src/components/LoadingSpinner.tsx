 // Replace with your icon path

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-800">
      <div className="animate-spin mb-4">
        <img src="https://s3-alpha-sig.figma.com/img/b463/0fb2/21a28241bd491f73eef9a5c02cc1fadb?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JRxBve2zJNy9ZmmnaDiQWH2~PoOF9nEGfcIDi~zyTwvVhvdXoPcSBrF6bVokiczhd8QghgN4IQuhQrGvZEiZQxDgOjp2PuR1~ajcQH~gxhKPlyUA0gdY38H8BxuXnxxHFaXtsFHVig-OaKSGYiatfnjfMI6iBNDC4G3acbRAGzOTL~G6~DtGPkM9-9NJ198X9fvaZyWz-XCo84cXXKJeZ5C4stszF4ExxarsBYq2CQXRmwtNYKTyb3ZN3f~D5SjCA94Rlrquym8SrZ~E5ividKxLCOJ4WVYutpaz6zErM0ACFBqq01OG81CYd~FE-R0QAXPQFWBnETb7x2W8LZVlCw__" alt="Loading..." className="w-32 h-32" />
      </div>
      <p className="text-white text-xl">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;