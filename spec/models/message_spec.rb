require 'rails_helper'

describe Message do
  
  describe '#create' do

  #保存できる場合
    context 'can save' do
      # 1.テキストがあれば保存できる
      it "is vlid with content" do
        expect(build(:message, image: nil)).to be_valid
      end
      # 2.イメージがあれば保存できる
      it "is valid with image" do
        expect(build(:message, content: nil)).to be_valid
      end
      # 3.テキストとイメージがあれば保存できる
      it "is vlid with content and image" do
        expect(build(:message)).to be_valid
      end
    end
  #保存できない場合
    context 'can not save' do
      # 1.テキストとイメージがなく保存できない
      it "is invalid without content and image" do
        message = build(:message, content: nil,
        image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
      # 2.group_idがないと保存できない
      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      # 3.user_idがないと保存できない
      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end