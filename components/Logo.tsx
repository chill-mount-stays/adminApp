export const Logo = ({
  showText,
  textProperties,
}: {
  showText?: boolean;
  textProperties?: string[];
}) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div>
          <svg
            className="h-8 lg:h-8"
            viewBox="0 0 79 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="39.5" cy="39.5" r="39.5" fill="#248512" />
            <path
              d="M13.9903 24.852L2.79863 35.8791C2.4604 47.2327 4.51465 53.1932 11.6861 63.1999C17.0422 68.8041 20.6552 71.252 28.309 74.227C36.6642 76.1439 41.3489 76.1017 49.7049 74.227L27.6507 64.6812L37.7578 55.3774V47.7291L41.6403 39.6645V24.852L60.5674 47.7291H63.859V32.5874L72.0882 42.627H75.709L63.859 28.4728L55.4653 36.8666L41.6403 20.2437L13.9903 47.7291V29.2957L18.5986 34.3978H22.0549L13.9903 24.852Z"
              fill="white"
              stroke="white"
            />
          </svg>
        </div>
        {showText ? (
          <p
            className={`font-scottel text-sm text-cms font-bold ${textProperties?.join(
              " "
            )}`}
          >
            Chill Mount Stays
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
