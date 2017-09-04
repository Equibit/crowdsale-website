<?php
namespace PHP_REST_API\Models;

use Postmark\PostmarkClient;

class EasyAppEmailTemplatesModel {
    public $templateID;
    public $toEmailAddresses;
    public $variables;

    public function __construct($toEmailAddresses, $templateID, $variables = null) {

        $this->templateID = $templateID;
        $this->toEmailAddresses = $toEmailAddresses;
        $this->variables = $variables;
    }

    public function send() {
        // Example request
        $client = new PostmarkClient(_POSTMARK_API_KEY_);

        //$browser = get_browser(null, true);
        $variables = Array('companyName' => _COMPANY_NAME_, 'primaryColour' => _PRIMARY_COLOR_, 'companyAddress' => _COMPANY_ADDRESS_, 'domain' => _DOMAIN_NAME_, 'secondaryColour' => _SECONDARY_COLOR_, 'browserName' => 'N/A', 'operatingSystem' => 'N/A');

        return $client->sendEmailWithTemplate(
            _COMPANY_NAME_ . " <" . _EMAIL_ADDRESS_ . ">",
            "" .$this->toEmailAddresses,
            $this->templateID,
            (!empty($this->variables) ? array_merge($this->variables, $variables) : $variables)
        );
    }
}