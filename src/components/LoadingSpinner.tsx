 // Replace with your icon path

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-800">
      <div className="animate-spin mb-4">
        <img src="https://s3-alpha-sig.figma.com/img/b463/0fb2/21a28241bd491f73eef9a5c02cc1fadb?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MdvDcRaMrhQrJf08Gx88Kq-IJALYEXzoQtF9NunOfgrRJBRJ9Bw37K8dlq9Gcx3RFFVacA-PC6fihXm5PdGpzSgj3X9EQ0jdag39czpMJ7IxGW4n-nZ~x6YRntPtPgqlkgS~ZkaHislkp81MqCAt9BkPxitB-GDY3ScyWCiCpxHeDcpnQenB0Kd5lTVAYuegZcs8K2r5V2BLB3BgkQLG84481q1MPce-QSrwNGYR0jkW3vF-AIXauYTeCcLsi-fUzz1QzsfcaHlMJYVGVbZWVfdcJB3IKAhgV98bc8TsHyC9-GGGJn3YjpTSv2HF5CGmMwQbA6lCeVqKFxBSYPr7FA__" alt="Loading..." className="w-32 h-32" />
      </div>
      <p className="text-white text-xl">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;