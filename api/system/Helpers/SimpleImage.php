<?php

namespace PHP_REST_API\Helpers;

class SimpleImage {
	public $image;
    public $image_type;
    public $image_size;

	function load($filename) {
		$image_info = getimagesize($filename);
		$this->image_type = $image_info[2];
		$this->image_size = filesize($filename);
		if ($this->image_type == IMAGETYPE_JPEG) {
			$this->image = imagecreatefromjpeg($filename);
		} else if ($this->image_type == IMAGETYPE_GIF) {
			$this->image = imagecreatefromgif($filename);
		} else if ($this->image_type == IMAGETYPE_PNG) {
			$this->image = imagecreatefrompng($filename);
		}
	}

	function loadFromString($str) {
        $info = getimagesizefromstring($str);
        $this->image_type = $info[2];
		$this->image = imagecreatefromstring($str);
		return $this->image !== false;
	}

    function loadBase64($base64) {
        $data = explode(',', $base64);
        $this->loadFromString(base64_decode($data[1]));
    }

	function save($filename, $compression=90, $permissions=null) {
		if ($this->image_type == IMAGETYPE_JPEG) {
			imagejpeg($this->image, $filename,$compression);
		} else if ($this->image_type == IMAGETYPE_GIF) {
			imagegif($this->image,$filename);
		} else if ($this->image_type == IMAGETYPE_PNG) {
			imagepng($this->image,$filename);
		}
		if ($permissions != null) {
			chmod($filename,$permissions);
		}
        imagedestroy($this->image);
	}

	function output($headers = true) {
		if ($headers) {
            header_remove();
            header('Pragma: public');
            header('Cache-Control: max-age=1209600');
            header('Expires: ' . gmdate('D, d M Y H:i:s \G\M\T', time() + 1209600));
            header('Accept-Ranges: bytes');
        }
		if ($this->image_type == IMAGETYPE_JPEG) {
            if ($headers) header('Content-type: image/jpeg');
			imagejpeg($this->image);
		} elseif ($this->image_type == IMAGETYPE_GIF) {
            if ($headers) header('Content-type: image/gif');
			imagegif($this->image);
		} elseif ($this->image_type == IMAGETYPE_PNG) {
            if ($headers) header('Content-type: image/png');
			imagepng($this->image);
		}
	}

	function outputBase64() {
        ob_start();
        $this->output(false);
        $contents =  ob_get_contents();
        ob_end_clean();

        $output = '';
        if ($this->image_type == IMAGETYPE_JPEG) {
            $output .= 'data:image/jpeg;base64,';
        } elseif ($this->image_type == IMAGETYPE_GIF) {
            $output .= 'data:image/gif;base64,';
        } elseif ($this->image_type == IMAGETYPE_PNG) {
            $output .= 'data:image/png;base64,';
        }

        return $output . base64_encode($contents);
    }

    function getExtension() {
        if ($this->image_type == IMAGETYPE_JPEG) {
            return 'jpeg';
        } elseif ($this->image_type == IMAGETYPE_GIF) {
            return 'gif';
        } elseif ($this->image_type == IMAGETYPE_PNG) {
            return 'png';
        }
        return false;
    }

	function getWidth() {
		return imagesx($this->image);
	}

	function getHeight() {
		return imagesy($this->image);
	}

	function resizeToHeight($height) {
        if ($height < $this->getHeight()) {
            $ratio = $height / $this->getHeight();
            $width = $this->getWidth() * $ratio;
            $this->resize($width, $height);
        }
	}

	function resizeToWidth($width) {
        if ($width < $this->getWidth()) {
            $ratio = $width / $this->getWidth();
            $height = $this->getheight() * $ratio;
            $this->resize($width, $height);
        }
	}

    function resizeSmallestTo($smallest) {
        if ($this->getWidth() > $this->getHeight()) {
            $this->resizeToHeight($smallest);
        } else {
            $this->resizeToWidth($smallest);
        }
    }

	function scale($scale) {
		$width = $this->getWidth() * $scale/100;
		$height = $this->getheight() * $scale/100;
		$this->resize($width,$height);
	}

    function getRatio() {
        return round($this->getWidth() / $this->getHeight(), 2);
    }

	function resize($width, $height) {
		$new_image = imagecreatetruecolor($width, $height);

		if ( $this->image_type == IMAGETYPE_GIF || $this->image_type == IMAGETYPE_PNG ) {
			$transparency_index = imagecolortransparent($this->image);
			if ($transparency_index >= 0) {
				$transparent_color = imagecolorsforindex($this->image, $transparency_index);
				$transparency = imagecolorallocate($new_image, $transparent_color['red'], $transparent_color['green'], $transparent_color['blue']);
				imagefill($new_image, 0, 0, $transparency);
				imagecolortransparent($new_image, $transparency);
			} else if ( $this->image_type == IMAGETYPE_PNG ) {
				imagealphablending($this->image, false);
				imagesavealpha($this->image, true);
				imagealphablending($new_image, false);
				imagesavealpha($new_image, true);
				$color = imagecolorallocatealpha($new_image, 255, 255, 255, 127);
				imagefill($new_image, 0, 0, $color);
				imagecolortransparent($new_image, $color);
			}
		}

		imagecopyresampled($new_image, $this->image, 0, 0, 0, 0, $width, $height, $this->getWidth(), $this->getHeight());
		$this->image = $new_image;
	}

	function cropSquare($src_x, $src_y, $newWidth) {
		$new_image = imagecreatetruecolor($newWidth, $newWidth);
		$ratio_w = $newWidth/$this->getWidth();
		$ratio_h = $newWidth/$this->getHeight();

		if ( $this->image_type == IMAGETYPE_GIF || $this->image_type == IMAGETYPE_PNG ) {
			$transparency = imagecolortransparent($this->image);
			if ($transparency >= 0) {
				$transparent_color = imagecolorsforindex($this->image, $transparency);
				$transparency = imagecolorallocate($new_image, $transparent_color['red'], $transparent_color['green'], $transparent_color['blue']);
				imagefill($new_image, 0, 0, $transparency);
				imagecolortransparent($new_image, $transparency);
			} else if ( $this->image_type == IMAGETYPE_PNG ) {
				imagealphablending($new_image, false);
                imagesavealpha($new_image, true);
				$color = imagecolorallocatealpha($new_image, 255, 255, 255, 127);
				imagefill($new_image, 0, 0, $color);
			}
		}

		imagecopyresampled($new_image, $this->image, 0, 0, $src_x, $src_y, $newWidth, $newWidth, $ratio_w*$this->getWidth(), $ratio_h*$this->getHeight());
		$this->image = $new_image;
	}

	function makeSquare() {
		if ($this->getHeight() > $this->getWidth()) {
			$new_x = 0;
			$new_y = round(($this->getHeight() - $this->getWidth())/2);
			$this->cropSquare($new_x, $new_y, $this->getWidth());
		} else {
			$new_x = round(($this->getWidth() - $this->getHeight())/2);
			$new_y = 0;
			$this->cropSquare($new_x, $new_y, $this->getHeight());
		}
	}

    function fixOrientation($orientation) {
        switch($orientation) {
            case 2: // horizontal flip
                $this->ImageFlip($this->image);
                break;
            case 3: // 180 rotate left
                $this->image = $this->imageRotateEquivalent($this->image, 180, -1);
                break;
            case 4: // vertical flip
                $this->ImageFlip($this->image);
                break;
            case 5: // vertical flip + 90 rotate right
                $this->ImageFlip($this->image);
                $this->image = $this->imageRotateEquivalent($this->image, -90, -1);
                break;
            case 6: // 90 rotate right
                $this->image = $this->imageRotateEquivalent($this->image, -90, -1);
                break;
            case 7: // horizontal flip + 90 rotate right
                $this->ImageFlip($this->image);
                $this->image = $this->imageRotateEquivalent($this->image, -90, -1);
                break;
            case 8: // 90 rotate left
                $this->image = $this->imageRotateEquivalent($this->image, 90, -1);
                break;
        }
    }

	function ImageFlip(&$image, $x = 0, $y = 0, $width = null, $height = null) {
	    if ($width  < 1) $width  = imagesx($image);
	    if ($height < 1) $height = imagesy($image);

	    // True color provides better results, if possible.
	    if (function_exists('imageistruecolor') && imageistruecolor($image)) {
	        $tmp = imagecreatetruecolor(1, $height);
	    } else {
	        $tmp = imagecreate(1, $height);
	    }
	    $x2 = $x + $width - 1;
	    for ($i = (int)floor(($width - 1) / 2); $i >= 0; $i--) {
	        // Backup right stripe.
	        imagecopy($tmp, $image, 0, 0, $x2 - $i, $y, 1, $height);
	        // Copy left stripe to the right.
	        imagecopy($image, $image, $x2 - $i, $y, $x + $i, $y, 1, $height);
	        // Copy backup right stripe to the left.
	        imagecopy($image, $tmp, $x + $i,  $y, 0, 0, 1, $height);
	    }
	    imagedestroy($tmp);
	}

    function imageRotateEquivalent(&$srcImg, $angle, $bgColor) {
        function rotateX($x, $y, $theta) {
            return $x * cos($theta) - $y * sin($theta);
        }
        function rotateY($x, $y, $theta) {
            return $x * sin($theta) + $y * cos($theta);
        }

        $srcw = imagesx($srcImg);
        $srch = imagesy($srcImg);

        if($angle == 0) return $srcImg;

        // Convert the angle to radians
        $theta = deg2rad ($angle);

        // Calculate the width of the destination image.
        $temp = array (    rotateX(0,     0, 0-$theta),
            rotateX($srcw, 0, 0-$theta),
            rotateX(0,     $srch, 0-$theta),
            rotateX($srcw, $srch, 0-$theta)
        );
        $minX = floor(min($temp));
        $maxX = ceil(max($temp));
        $width = $maxX - $minX;

        // Calculate the height of the destination image.
        $temp = array (    rotateY(0,     0, 0-$theta),
            rotateY($srcw, 0, 0-$theta),
            rotateY(0,     $srch, 0-$theta),
            rotateY($srcw, $srch, 0-$theta)
        );
        $minY = floor(min($temp));
        $maxY = ceil(max($temp));
        $height = $maxY - $minY;

        $destImg = imagecreatetruecolor($width, $height);
        imagefill($destImg, 0, 0, imagecolorallocate($destImg, 0,255, 0));

        // sets all pixels in the new image
        for($x=$minX;$x<$maxX;$x++) {
            for($y=$minY;$y<$maxY;$y++)
            {
                // fetch corresponding pixel from the source image
                $srcX = round(rotateX($x, $y, $theta));
                $srcY = round(rotateY($x, $y, $theta));
                if($srcX >= 0 && $srcX < $srcw && $srcY >= 0 && $srcY < $srch)
                {
                    $color = imagecolorat($srcImg, $srcX, $srcY );
                }
                else
                {
                    $color = $bgColor;
                }
                imagesetpixel($destImg, $x-$minX, $y-$minY, $color);
            }
        }

        return $destImg;
    }

	function writeInImage($text, $step = 100) {
		$color = imagecolorallocate($this->image, 255, 255, 255);
		imagestring($this->image, 5, (round($this->getWidth()/$step)), (round($this->getHeight()/$step)), $text, $color);
	}

	function merge2Images($biggerImage, $smallImage, $cornerLeft, $cornerTop, $smallWidth, $smallHeight) {
        imagecopy($biggerImage->image, $smallImage->image, $cornerLeft, $cornerTop, 0, 0, $smallWidth, $smallHeight);
    }
}
