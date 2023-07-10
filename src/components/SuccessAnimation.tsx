type SuccessAnimationProps = {
  title: string;
};

export default function SuccessAnimation({ title }: SuccessAnimationProps) {
  return (
    <div className="success-animation">
      <svg
        className="success-animation-checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="success-animation-checkmark-circle"
          cx="26"
          cy="26"
          r="25"
        />
        <path
          className="success-animation-checkmark-circle"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <p>{title}</p>
    </div>
  );
}
