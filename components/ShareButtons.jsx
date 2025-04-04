'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-center text-[#7265df] mb-4">
        Share This Property
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
          className="transition-transform hover:scale-110"
        >
          <FacebookIcon size={48} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
          className="transition-transform hover:scale-110"
        >
          <TwitterIcon size={48} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
          className="transition-transform hover:scale-110"
        >
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing: ${shareUrl}`}
          className="transition-transform hover:scale-110"
        >
          <EmailIcon size={48} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
