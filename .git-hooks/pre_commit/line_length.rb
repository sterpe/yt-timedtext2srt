module Overcommit::Hook::PreCommit
  class LineLength < Base
    def run
      error_lines = []
      warning_lines = []

      max_line_length = config['max']

      applicable_files.each do |file|
        modified_lines_num = modified_lines_in_file(file)

        File.open(file, 'r').each_with_index do |line, index|
          if line.length > max_line_length
            message = format("#{file}:#{index + 1}: "\
              "Line is too long [%d/%d]",
              line.length, max_line_length)

            if modified_lines_num.include?(index + 1)
              error_lines << message
            else
              warning_lines << message
            end
          end
        end
      end

      return :fail, error_lines.join("\n") if error_lines.any?

      return :warn, "Modified files have lints "\
        "(on lines you didn't modify)\n" <<
        warning_lines.join("\n") if warning_lines.any?

      :pass
    end
  end
end
