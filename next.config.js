/** @type {import('next').NextConfig} */
const nextConfig = {

    async headers(){
        return [
            {
                source:'/:path*',
                headers:[
                    {
                        key:":refer-policy", value:'no-referrer'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
